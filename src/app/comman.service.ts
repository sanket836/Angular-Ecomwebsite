import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommanService {
  //baseUrl:any = environment.baseURL;
  //baseUrl1:string = "http://localhost:3000/Products";
  //baseUrl2:any = environment.baseURLcategory;

  constructor(private http: HttpClient) { }


  getuser(){
       return this.http.get("http://localhost:3000/users");
  }

  /***************** Products *************/
  getproducts(){
      return this.http.get("http://localhost:3000/Products");
  }

  viewproducts(id:string){
       return this.http.get("http://localhost:3000/Products/" +id);
  }

  addproduct(id:any) {
    return this.http.post("http://localhost:3000/Products", id);
  }

  updateproducts(productid:any, data:any) {
       const baseurl = 'http://localhost:3000/Products/' +productid;
       return this.http.put(baseurl, data);
  }

  deleteproducts(id:any) {
    return this.http.delete("http://localhost:3000/Products/" +id);
  }


  /********************* Category ************************/
  getcategory(){
      return this.http.get("http://localhost:3000/Category");
  }

  viewcategory(id:string){
    return this.http.get("http://localhost:3000/Category/" +id);
  }

  addcategory(id:any) {
  return this.http.post("http://localhost:3000/Category", id);
  }

  updatecategory(categoryid:any, data:any){
    const baseurl = 'http://localhost:3000/Category/' +categoryid;
    return this.http.put(baseurl, data);
  }

  deletecategory(id:any) {
    return this.http.delete("http://localhost:3000/Category/" +id);
  }



}
