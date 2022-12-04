import { AfterViewInit, Component, OnInit } from '@angular/core';
import SwaggerUI from 'swagger-ui';

@Component({
  selector: 'app-api-documentation',
  templateUrl: './api-documentation.component.html',
  styleUrls: ['./api-documentation.component.css']
})
export class ApiDocumentationComponent implements AfterViewInit {

  ngAfterViewInit() {
    const ui = SwaggerUI({
        url: 'https://schoolagreementapi-test.azurewebsites.net/swagger/v1/swagger.json',
        domNode: document.getElementById('swagger'),
    });
}}
