import {angular} from 'angular';
import {HomeService} from '../homeService';

export class HomeController {
  public message: string;
  public mainGridOptions:any;
  static $inject = ["$http", "$window", "homeService"];
  constructor(private $http: angular.IHttpService, private $window: angular.IWindowService, private homeService:HomeService) {
    this.homeService.doSomething();
    this.message = "Hello from the home component";

    this.mainGridOptions = {
      dataSource: {
          type: "odata",
          transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
          },
          pageSize: 5,
          serverPaging: true,
          serverSorting: true
      },
      sortable: true,
      pageable: true,
      filterable: true,
      columnMenu: true,
      columns: [{
          field: "FirstName",
          title: "First Name",
          width: "120px"
          },{
          field: "LastName",
          title: "Last Name",
          width: "120px"
          },{
          field: "Country",
          width: "120px"
          },{
          field: "City",
          width: "120px"
          },{
          field: "Title"
      }]
    };
  }
}

export class HomeComponent implements angular.IComponentOptions {
  public bindings: any;
  public controller: any;
  public template: any;

  constructor() {
    this.bindings = {};
    this.controller = HomeController;
    this.template= require('./home.html');
  }
}

