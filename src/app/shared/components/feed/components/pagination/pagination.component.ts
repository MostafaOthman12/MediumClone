import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilitService } from '../../../../Services/utilits.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  imports: [CommonModule, RouterModule],
})
export class PaginationComponent {
  utilitsService = inject(UtilitService);
  total = input.required<number>();
  limit = input.required<number>();
  currentPage = input.required<number>();
  url = input.required<string>();
  pagesCount: number = 0;
  pages: number[] = [];
  ngOnInit(): void {
    console.log(this.currentPage());
    this.pagesCount = Math.ceil(this.total() / this.limit());
    this.pages = this.utilitsService.range(1, this.pagesCount);
    console.log(this.pages);
  }
}
