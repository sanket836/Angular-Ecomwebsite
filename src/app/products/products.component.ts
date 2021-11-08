import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommanService } from '../comman.service';
import { AddProductsComponent } from './add-products/add-products.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortable } from '@angular/material/sort';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { EditCategoryComponent } from '../category/edit-category/edit-category.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
   title:string="Welcome to Products Page";
   displaydata:any;
   displaycurdata:any;
   displayedColumns: string[] = ['id', 'name', 'description', 'categoryid', 'price', 'actions'];
   rowData: any;
   categories:any={};


   @ViewChild(MatSort) sort!: MatSort;


   @ViewChild(MatPaginator) paginator!: MatPaginator;
   length = 1000;
   pageSize = 10;
   pageSizeOptions: number[] = [5, 10, 25, 100];


  constructor(private commanservice: CommanService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog)

              {
                this.commanservice.getcategory().subscribe((data:any) => {
                   data.forEach((element:any) => {
                      this.categories[element.id]=element
                   });
                })
              }

  ngOnInit(): void {
      this.displayproducts();
  }


  displayproducts(){
     this.commanservice.getproducts().subscribe((data:any) => {
        this.displaydata = data;
        this.displaydata.paginator = this.paginator;
        this.displaydata =  new MatTableDataSource(data);
        this.displaydata.sort = this.sort;
        console.log(this.displaydata);
     })
  }

   addproductsdata() {
       const dialogRef =  this.dialog.open(AddProductsComponent,{
          data: {action: 'add'}
       });
       dialogRef.afterClosed().subscribe(result => {
         this.displayproducts();
      });
  }


  editproductsdata(product:any) {
    const dialogRef =  this.dialog.open(AddProductsComponent, {
        data : {action: 'edit', product: product}
    })
     dialogRef.afterClosed().subscribe(result => {
        this.displayproducts();
    });
  }


  deleteproductsdata(id:any) {
      this.commanservice.deleteproducts(id).subscribe((data)=> {
      this._snackBar.open("Products Deleted Successfully...");
      console.log(data, "Products Deleted Successfully...");
      this.displayproducts();
      })
  }

}
