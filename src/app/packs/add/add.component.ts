import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PackService } from '../../services/pack.service';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-pack-add',
  imports: [FormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  pack: any = {
    offerName: '',
    durationMonths: '',
    monthlyPrice: ''
  };

  constructor(private packService: PackService, private router: Router) {}

  savePack() {
    this.packService.addPack(this.pack).subscribe(() => {
      alert('Pack ajouté avec succès !');
      this.router.navigate(['/packs']);
    });
  }
}
