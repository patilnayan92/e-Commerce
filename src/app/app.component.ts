import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce';
  sortPriceOption: string = "";
  countProduct: string = "";
  filterOption = [{ name: 'All Products', value: 'AllProducts' }, { name: 'Tee Shirt', value: 'T-shirt' }, { name: 'Denim', value: 'Denim'}, { name: 'Sweatshirts', value: 'Sweatshirts'}, { name: 'Polo Tee Shirt', value: 'PoloTeeShirt'}, { name: 'Shirt', value: 'shirt'}, { name: 'Jacket', value: 'jacket' }];
  priceFilterOption = [{ name: 'Price Low to High', value:'lth' }, { name: 'Price High to Low', value: 'htl' }];

  productJSONData: any = [];
  filterSelectOption: string = "";
  selectOption: string = "";
  selectProductId: string = "";
  showAddCartBtn: boolean = false;
  cartItem: any = [];
  cartLength: string = "";
  quantity: number = 1;
  totalAmount: number = 0;
  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.filterSelectOption = 'AllProducts';
    this.filterListData(this.filterSelectOption);
    this.isActive(this.filterSelectOption);
  }
  
  getProducts() {
    this.httpClient.get("assets/product.json").subscribe(data =>{
      this.productJSONData = data;
      this.countProduct = this.productJSONData.length;
    })
  };

  filterListData(val: string) {
    this.filterSelectOption = val;
    this.filterProduct(this.filterSelectOption);
  }

  isActive(val: string) {
    if(val == 'AllProducts') {
      return this.filterSelectOption === 'AllProducts';  
    } else {
      return this.filterSelectOption === val;
    }
  };

  priceFilterData(val: string) {
    console.log(val, "Priceval");
  }

  filterProduct(filterValue: string) {
    this.httpClient.get("assets/product.json").subscribe(data =>{
      this.productJSONData = [];
      if(filterValue == 'AllProducts') {
        this.productJSONData = data;
        this.countProduct = this.productJSONData.length;
      } else {
        this.httpClient.get("assets/product.json").subscribe(data =>{
          Object(data).forEach((ele: any) => {
            if(ele.tag === filterValue) {
              this.productJSONData.push(ele);
            }
          })
          this.countProduct = this.productJSONData.length;
        })
      }
    })
  }

  selectOptions(value: string, id: string) {
    this.selectOption = value;
    this.selectProductId = id;
    this.showAddCartBtn = true;
  }

  addToCart(product: any) {
    this.cartItem.push(
      { 'id': product.id, 'price': product.price, 'name': product.vendor }
    );
    this.cartLength = this.cartItem.length;
    this.toastr.info("Item added in cart");
  }

  updateTotal(price: number, qty: string, pid: string) {
    this.quantity = Number(qty);
    this.selectProductId = pid;
    this.totalAmount = price * this.quantity;
  }

  getTotalPrice() {
    return this.cartItem.map((t:any) => Number(t.price)).reduce((acc:string, value:string) => acc + value, 0);
  }

  buyProduct() {
    this.toastr.success("Thanks you for Product Purchase");
    this.cartItem = [];
    this.cartLength = '';
  }
}
