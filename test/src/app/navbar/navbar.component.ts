import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SubSink } from 'subsink';
import { IProduct } from '../core/interfaces/product.interface';
import { CategoriesService } from '../core/services/categories.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  search: string;

  searchList$: Observable<IProduct[]>;

  private readonly _subSink = new SubSink();

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
  }

  onSearch(): void {
    this._subSink.add(
      this._categoriesService.getProducts().subscribe((products: IProduct[]) => {
        this.searchList$ = of(
          products.filter(
            product => product.title.toLowerCase().includes(this.search.toLowerCase()))
        );
      })
    );
  }

  onSelect(product: IProduct): void {
    this._router.navigate(["/", "product", product.id], { relativeTo: this._activatedRoute });
    this._resetSearch();
  }
  
  private _resetSearch(): void {
    this.search = "";
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }

}
