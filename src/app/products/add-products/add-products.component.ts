import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommanService } from 'src/app/comman.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  selectedValue!: any;
  categories!: any;
  productid: any;

  addproductsForm = this.formBuilder.group({
    name: new FormControl(this.data.action === 'edit' ? this.data.product.name : '',[Validators.required,Validators.maxLength(20),Validators.pattern("^[a-zA-Z -']+"),]),
    description: new FormControl(this.data.action === 'edit' ? this.data.product.description : '',[Validators.required,Validators.maxLength(20),Validators.pattern("^[a-zA-Z -']+"),]),
    categoryname: new FormControl(this.data.action === 'edit' ? this.data.product.categoryid : '',[Validators.required]),
    price: new FormControl(this.data.action === 'edit' ? this.data.product.price : '',[Validators.required,Validators.maxLength(8),Validators.pattern('[0-9]*')])
  });

  constructor(
        public dialogRef: MatDialogRef<AddProductsComponent>,
        private formBuilder: FormBuilder,
        private commanservice: CommanService,
        private _snakBar: MatSnackBar,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any
     ) {}


  ngOnInit(): void {
    this.commanservice.getcategory().subscribe((res) => {
      this.categories = res;
      if (this.data.action === 'edit') {
        const catg = this.categories.find((cat: any) => {
          return cat.id == this.data.product.categoryid;
        });

        this.addproductsForm.patchValue({
          categoryname: catg,
        });
      }
    });
  }

  createproduct() {
    const product = this.addproductsForm.value;
    product.categoryid = product.categoryname.id;
    delete product.categoryname;

    this.commanservice.addproduct(product).subscribe((data:any) => {
        this._snakBar.open('Product Created Successfully');
        console.log(data, 'Product Created');
        this.dialogRef.close();
      },
      (err) => {
        this._snakBar.open(' Unable to create product');
      }
    );
  }

  updateproduct() {
    const product = this.addproductsForm.value;
    product.categoryid = product.categoryname.id;
    delete product.categoryname;

    this.commanservice.updateproducts(this.data.product.id, product).subscribe((data) => {
          this._snakBar.open('Product Updated Successfully');
          console.log(data, 'Product Updated');
          this.dialogRef.close();
        },
        (err) => {
          this._snakBar.open(' Unable to update product');
        }
      );
  }
}
