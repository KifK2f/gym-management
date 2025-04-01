import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackService } from '../../services/pack.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-pack-edit',
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  pack: any = {};

  constructor(
    private route: ActivatedRoute,
    private packService: PackService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.packService.getPackById(Number(id)).subscribe(data => {
      this.pack = data;
    });
  }

  updatePack() {
    this.packService.updatePack(this.pack.id, this.pack).subscribe(() => {
      alert('Offre modifiée avec succès !');
      this.router.navigate(['/packs']);
    });
  }
}
