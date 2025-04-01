import { Component, OnInit } from '@angular/core';
import { PackService } from '../../services/pack.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pack-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  packs: any[] = [];

  constructor(private packService: PackService) {}

  ngOnInit() {
    this.loadPacks();
  }

  loadPacks() {
    this.packService.getAllPacks().subscribe(data => {
      this.packs = data;
    });
  }

  deletePack(id: number) {
    if (confirm("Voulez-vous supprimer cette offre ?")) {
      this.packService.deletePack(id).subscribe(() => {
        this.loadPacks();
      });
    }
  }
}
