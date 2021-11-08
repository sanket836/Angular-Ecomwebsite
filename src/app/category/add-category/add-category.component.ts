import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommanService } from 'src/app/comman.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categories!: any;


  addcategoryForm = this.formBuilder.group({
    name: new FormControl(this.data.action === 'edit' ? this.data.category.name : '', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z \-\']+')]),
    description: new FormControl(this.data.action === 'edit' ? this.data.category.description : '', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z \-\']+')])
})

  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>,
              private formBuilder: FormBuilder,
              private commanservice: CommanService,
              private _snakBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
      this.commanservice.getcategory().subscribe((res)=>{
        this.categories = res;
      })
  }

  createcategory() {
      this.commanservice.addcategory(this.addcategoryForm.value).subscribe((data) => {
          this._snakBar.open("Category Created Successfully");
          console.log(data, "Category Created");
          this.dialogRef.close();
      }, err => {
        this._snakBar.open(" Unable to create category");
      })
   }


   updatecategory() {
      const category = this.addcategoryForm.value;

      this.commanservice.updatecategory(this.data.category.id, category).subscribe((data) => {
        this._snakBar.open("Category Updated Successfully");
        console.log(data, "Category Updated");
        this.dialogRef.close();
      }, err => {
        this._snakBar.open(" Unable to create category");
      })
   }

}
