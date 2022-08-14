import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/core/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: IProduct;

  product$: Observable<IProduct>;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
  ) { }

  ngOnInit(): void {
  }

  onClick(product: IProduct): void {
    console.log(product);
    this._router.navigate(["./../../", "product", product.id ], { relativeTo: this._activatedRoute });
  }

}
