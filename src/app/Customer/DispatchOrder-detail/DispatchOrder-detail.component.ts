import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';    
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { CustomerService } from 'src/app/shared/CustomerService';
@Component({
  selector: 'app-COrder-detail',
  templateUrl: './DispatchOrder-detail.component.html',
  styleUrls: ['./DispatchOrder-detail.component.css']
})
export class CustomerDispatchOrderDetailComponent implements OnInit {
  Orders: any[]; 
  constructor(private router: Router, private _CustomerService: CustomerService
    , public paginationService: PaginationService) { }
  userData ; 
  pageNo: any = 1;  
  search=null;
  pageNumber: boolean[] = [];  
  sortOrder: any = 'CompanyName_ASC';  
  order:any='CompanyName';  
  //Pagination Variables  
  //Page Row variables  
  
  pageField = [];  
  exactPageList: any;  
  paginationData: number;  
  OrdersPerPage: any = 10;  
  orderBy: string='Asc';  
  
  totalOrders: any;  
  totalOrdersCount: any;  
  currentPage = 1;  
  
  ngOnInit() {  
    this.pageNumber[0] = true;  
    this.paginationService.temppage = 0;  
    this.getAllOrders();  
  }  

  getAllOrders() {  
       this._CustomerService.getAllOrderData(localStorage.getItem('UserCode'),this.pageNo,this.OrdersPerPage,this.search).subscribe((data: any) => {
      this.Orders = data as any[];
      this.getAllOrdersCount();
    })
    
  }  
  getAllOrdersCount() {  
    this._CustomerService.getAllOrderCount(localStorage.getItem('UserCode'),this.search).subscribe((res: any) => {  
      this.totalOrdersCount = res;  
      this.totalNoOfPages();  
    })  
  }  
  
  //Method For Pagination  
  totalNoOfPages() {  
  
    this.paginationData = Number(this.totalOrdersCount / this.OrdersPerPage);  
    let tempPageData = this.paginationData.toFixed();  
    if (Number(tempPageData) < this.paginationData) {  
      this.exactPageList = Number(tempPageData) + 1;  
      this.paginationService.exactPageList = this.exactPageList;  
    } else {  
      this.exactPageList = Number(tempPageData);  
      this.paginationService.exactPageList = this.exactPageList  
    }  
    this.paginationService.pageOnLoad();  
    this.pageField = this.paginationService.pageField;  
  
  }  
  showOrdersByPageNumber(page, i) {  
    this.Orders = [];  
    this.pageNumber = [];  
    this.pageNumber[i] = true;  
    this.pageNo = page;  
    this.currentPage =page;  
    this.getAllOrders();  
  }  
  
  //Pagination Start  
  
  showPrevOrders() {  
  
    if (this.paginationService.showNoOfCurrentPage != 1) {  
      this.paginationService.prevPage();  
      this.pageNumber = [];  
      this.pageNumber[0] = true;  
      this.currentPage = this.paginationService.pageField[0];  
      this.getAllOrders();  
    }  
  
  }  
  
  showNextOrders() {  
  
    if (this.paginationService.disabledNextBtn == false) {  
      this.pageNumber = [];  
      this.paginationService.nextPage();  
      this.pageNumber[0] = true;  
      this.currentPage = this.paginationService.pageField[0];  
      this.getAllOrders();  
    }  
  }  
  sortByHeading(value: string, id) {  
    this.Orders = [];  
    this.sortOrder = value;  
    this.order =value;  
    if (this.orderBy == "Desc") {  
      this.orderBy = "Asc"  
      this.sortOrder =this.sortOrder+'_ASC';  
    } else {  
      this.orderBy = "Desc";  
      this.sortOrder =this.sortOrder+'_DESC'  
    }  
    this.getAllOrders();  
  }  
  
}   
