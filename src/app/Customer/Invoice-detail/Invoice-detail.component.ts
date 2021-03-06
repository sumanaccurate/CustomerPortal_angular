import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';    
import { PaginationService } from '../../component/pagination/pagination.service';
import { FormGroup, FormControl ,Validators, AbstractControl } from '@angular/forms';
import { CustomerService } from 'src/app/shared/CustomerService';
@Component({
  selector: 'app-COrder-detail',
  templateUrl: './Invoice-detail.component.html',
  styleUrls: ['./Invoice-detail.component.css']
})
export class CustomerInvoiceDetailComponent implements OnInit {
  Invoices: any[]; 
  constructor(private router: Router, private _CustomerService: CustomerService
    , public paginationService: PaginationService) { }
  userData ; 
  pageNo: any = 1;  
  search=null;
  pageNumber: boolean[] = [];  
  sortInvoice: any = 'CompanyName_ASC';  
  Invoice:any='CompanyName';  
  //Pagination Variables  
  //Page Row variables  
  
  pageField = [];  
  exactPageList: any;  
  paginationData: number;  
  InvoicesPerPage: any = 10;  
  InvoiceBy: string='Asc';  
  
  totalInvoices: any;  
  totalInvoicesCount: any;  
  currentPage = 1;  
  
  ngOnInit() {  
    this.pageNumber[0] = true;  
    this.paginationService.temppage = 0;  
    this.getAllInvoices();  
  }  

  getAllInvoices() {  
       this._CustomerService.getAllInvoiceData(localStorage.getItem('UserCode'),this.pageNo,this.InvoicesPerPage,this.search).subscribe((data: any) => {
      this.Invoices = data as any[];
      this.getAllInvoicesCount();
    })
    
  }  
  getAllInvoicesCount() {  
    this._CustomerService.getAllInvoiceCount(localStorage.getItem('UserCode'),this.search).subscribe((res: any) => {  
      this.totalInvoicesCount = res;  
      this.totalNoOfPages();  
    })  
  }  
  
  //Method For Pagination  
  totalNoOfPages() {  
  
    this.paginationData = Number(this.totalInvoicesCount / this.InvoicesPerPage);  
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
  showInvoicesByPageNumber(page, i) {  
    this.Invoices = [];  
    this.pageNumber = [];  
    this.pageNumber[i] = true;  
    this.pageNo = page;  
    this.currentPage =page;  
    this.getAllInvoices();  
  }  
  
  //Pagination Start  
  
  showPrevInvoices() {  
  
    if (this.paginationService.showNoOfCurrentPage != 1) {  
      this.paginationService.prevPage();  
      this.pageNumber = [];  
      this.pageNumber[0] = true;  
      this.currentPage = this.paginationService.pageField[0];  
      this.getAllInvoices();  
    }  
  
  }  
  
  showNextInvoices() {  
  
    if (this.paginationService.disabledNextBtn == false) {  
      this.pageNumber = [];  
      this.paginationService.nextPage();  
      this.pageNumber[0] = true;  
      this.currentPage = this.paginationService.pageField[0];  
      this.getAllInvoices();  
    }  
  }  
  sortByHeading(value: string, id) {  
    this.Invoices = [];  
    this.sortInvoice = value;  
    this.Invoice =value;  
    if (this.InvoiceBy == "Desc") {  
      this.InvoiceBy = "Asc"  
      this.sortInvoice =this.sortInvoice+'_ASC';  
    } else {  
      this.InvoiceBy = "Desc";  
      this.sortInvoice =this.sortInvoice+'_DESC'  
    }  
    this.getAllInvoices();  
  }  
  
}   
