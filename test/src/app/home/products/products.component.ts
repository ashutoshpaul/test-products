import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IProduct } from 'src/app/core/interfaces/product.interface';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { tap } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  categories$: Observable<string[]>;
  products$: Observable<IProduct[]>;
  
  get category(): string {
    return this._selectedCategory;
  }

  set category(category: string) {
    this._selectedCategory = category;
  }

  private _selectedCategory: string;

  private readonly _subsSink = new SubSink();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.categories$ = this._categoriesService.getCategories();
    
    this._subsSink.add(
      this._activatedRoute.paramMap.subscribe((param: ParamMap) => {
        const category: string = param.get('category');
        if(category) {
          if(category == 'all') {
            this.products$ = this._categoriesService.getProducts();
            this.category = "";
          } else {
            this.products$ = this._categoriesService.getProductsByCategory(category);
            this.category = category;
          }
        }
      })
    );
  }

  onSelectCategory(category: string): void {
    this._selectedCategory = category;
    this.products$ = this._categoriesService.getProductsByCategory(category);
    this._router.navigate(['..', category], { relativeTo: this._activatedRoute });
  }

  isCategorySelected(category: string): boolean {
    return category === this.category;
  }

  ngOnDestroy(): void {
    this._subsSink.unsubscribe();
  }

}
