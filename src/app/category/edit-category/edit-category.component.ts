import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommanService } from 'src/app/comman.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryid: any;
  categorydetails: any;
  editcategoryform: FormGroup = new FormGroup({});
  dataloaded: boolean = false;

  constructor(private activatedroute: ActivatedRoute,
              private commanservice: CommanService,
              private formbuilder: FormBuilder,
              private _snakBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    this.dataloaded = false;
    this.activatedroute.params.subscribe(data => {
        this.categoryid = data.id;
    })


    if(this.categoryid !== '') {
      // View product details
      this.commanservice.viewcategory(this.categoryid)
      .toPromise()
      .then(data => {
           this.categorydetails = data;
           Object.assign(this.categorydetails, data);
           console.log(this.categorydetails);

           //Build the edit form
           this.editcategoryform = this.formbuilder.group({
               'name': new FormControl(this.categorydetails.name),
               'description': new FormControl(this.categorydetails.description)
           })

             this.dataloaded = true;

      })
         .catch(err => {
              console.log(err);
         })
   }

  }


  updatecategory() {
    this.commanservice.updatecategory(this.categoryid, this.editcategoryform.value).subscribe((data) => {
        this._snakBar.open("Category Updated Successfully");
        this.router.navigate(['sidenv/category']);
        console.log(data, "Category Updated");
       }, err => {
         this._snakBar.open(" Unable to create category");
      })

}


}
