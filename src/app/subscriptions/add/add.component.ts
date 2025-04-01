import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { PackService } from '../../services/pack.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-subscription-add',
  imports: [FormsModule, CommonModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  subscription: any = {
    customerId: '',
    packId: '',
    startDate: '',
    endDate: '', // Ajout du champ endDate
    status: 'active'
  };
  customers: any[] = [];
  packs: any[] = [];
  isLoading: boolean = false; // Indicateur de chargement
  errorMessage: string = ''; // Message d'erreur

  constructor(
    private subscriptionService: SubscriptionService,
    private customerService: CustomerService,
    private packService: PackService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCustomers();
    this.loadPacks();
  }

  // Charger la liste des clients
  loadCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => (this.customers = data),
      error: (err) => (this.errorMessage = 'Erreur lors du chargement des clients.')
    });
  }

  // Charger la liste des offres (packs)
  loadPacks() {
    this.packService.getAllPacks().subscribe({
      next: (data) => (this.packs = data),
      error: (err) => (this.errorMessage = 'Erreur lors du chargement des offres.')
    });
  }

  // Enregistrer l'abonnement
  saveSubscription() {
    // Vérifier que tous les champs sont remplis
    if (!this.subscription.customerId || !this.subscription.packId || !this.subscription.startDate || !this.subscription.endDate) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    // Convertir les dates en objets Date
    const startDate = new Date(this.subscription.startDate);
    const endDate = new Date(this.subscription.endDate);
    const today = new Date();

    // Vérifier que la date de début n'est pas dans le futur
    if (startDate > today) {
      this.errorMessage = 'La date de début ne peut pas être dans le futur.';
      return;
    }

    // Vérifier que la date de début n'est pas après la date de fin
    if (startDate > endDate) {
      this.errorMessage = 'La date de début ne peut pas être après la date de fin.';
      return;
    }

    this.isLoading = true; // Activer l'indicateur de chargement
    this.errorMessage = ''; // Réinitialiser le message d'erreur

    // Préparer les données pour l'API
    const subscriptionData = {
      customer: { id: this.subscription.customerId },
      pack: { id: this.subscription.packId },
      startDate: this.subscription.startDate,
      endDate: this.subscription.endDate,
      status: this.subscription.status.toUpperCase() // Assurez-vous que le statut est en majuscules
    };

    this.subscriptionService.addSubscription(subscriptionData).subscribe({
      next: () => {
        alert('Abonnement ajouté avec succès !');
        this.router.navigate(['/subscriptions']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Vous n\'êtes pas authentifié. Veuillez vous connecter.';
          this.router.navigate(['/login']); // Redirigez l'utilisateur vers la page de connexion
        } else {
          this.errorMessage = 'Erreur lors de l\'ajout de l\'abonnement. Veuillez réessayer.';
        }
        console.error(err); // Afficher l'erreur dans la console pour le débogage
      },
      complete: () => (this.isLoading = false) // Désactiver l'indicateur de chargement
    });
  }
}