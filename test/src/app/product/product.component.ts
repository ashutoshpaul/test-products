import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/core/interfaces/product.interface';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  product$: Observable<IProduct>;

  private readonly _subSink = new SubSink();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this._subSink.add(
      this._activatedRoute.paramMap.subscribe((param: ParamMap) => {
        const productId: string = param.get('id');
        if(productId) {
          this.product$ = this._categoriesService.getProduct(+productId);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }

}
