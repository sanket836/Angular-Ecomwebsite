import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommanService } from 'src/app/comman.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
  productid: any;
  productdetails: any;
  editproductform: FormGroup = new FormGroup({});
  dataloaded: boolean = false;
  selectedValue!: string;
  categories!:any;


  constructor(private activatedroute: ActivatedRoute,
              private commanservice: CommanService,
              private formbuilder: FormBuilder,
              private _snakBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
     this.dataloaded = false;
     this.activatedroute.params.subscribe(data => {
         this.productid = data.id;

         this.commanservice.getcategory().subscribe(res => {
          this.categories = res;
       })
     })

     if(this.productid !== '') {
        // View product details
        this.commanservice.viewproducts(this.productid)
        .toPromise()
        .then(data => {
             this.productdetails = data;
             Object.assign(this.productdetails, data);
             console.log(this.productdetails);

             //Build the edit form
             this.editproductform = this.formbuilder.group({
                 'name': new FormControl(this.productdetails.name),
                 'description': new FormControl(this.productdetails.description),
                 'categoryname': new FormControl(this.productdetails.categoryname),
                 'price': new FormControl(this.productdetails.price)
             })

               this.dataloaded = true;

        })
           .catch(err => {
                console.log(err);
           })
     }
  }

  updateproduct() {
       this.commanservice.updateproducts(this.productid, this.editproductform.value).subscribe((data) => {
           this._snakBar.open("Product Updated Successfully");
           this.router.navigate(['sidenv/products']);
           console.log(data, "Product Updated");
          }, err => {
            this._snakBar.open(" Unable to create product");
         })

  }

}
