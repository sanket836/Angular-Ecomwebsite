import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommanService } from '../comman.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortable } from '@angular/material/sort';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  title:string="Welcome to Category Page";
  displaydata:any;
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  rowData: any;


  @ViewChild(MatSort) sort!: MatSort;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
   length = 1000;
   pageSize = 10;
   pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private commanservice: CommanService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.displaycategory();
  }

  displaycategory(){
    this.commanservice.getcategory().subscribe((data:any) => {
       this.displaydata = data;
       this.displaydata.paginator = this.paginator;
       this.displaydata = new MatTableDataSource(data);
       this.displaydata.sort = this.sort;
       console.log(this.displaydata);
    })
  }

  addcategorydata() {
      const dialogRef = this.dialog.open(AddCategoryComponent,{
           data: {action: 'add'}
      });
      dialogRef.afterClosed().subscribe(result => {
         this.displaycategory();
      })
  }

  editcategorydata(category:any) {
      const dialogRef = this.dialog.open(AddCategoryComponent,{
           data: {action: 'edit', category: category}
      })
      dialogRef.afterClosed().subscribe(result => {
         this.displaycategory();
      })
  }

  deletecategorydata(id:any) {
    this.commanservice.deletecategory(id).subscribe((data)=> {
      this._snackBar.open("Category Deleted Successfully...");
      console.log(data, "Category Deleted Successfully...");
      this.displaycategory();
      })
  }

}
