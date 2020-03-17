/* tslint:disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { IndexService } from './services/index.service';
import { LinkRelationService } from './services/link-relation.service';
import { DealService } from './services/deal.service';
import { BranchService } from './services/branch.service';
import { ConsumerProductService } from './services/consumer-product.service';
import { MortgageProductService } from './services/mortgage-product.service';
import { BorrowerRoleTypeService } from './services/borrower-role-type.service';
import { ChannelService } from './services/channel.service';
import { CurrencyService } from './services/currency.service';
import { DealPartyRoleTypeService } from './services/deal-party-role-type.service';
import { LoanTypeService } from './services/loan-type.service';
import { ConsumerFactoryProductService } from './services/consumer-factory-product.service';
import { MortgageFactoryProductService } from './services/mortgage-factory-product.service';
import { ProductCategoryService } from './services/product-category.service';
import { ApplicationService } from './services/application.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    IndexService,
    LinkRelationService,
    DealService,
    BranchService,
    ConsumerProductService,
    MortgageProductService,
    BorrowerRoleTypeService,
    ChannelService,
    CurrencyService,
    DealPartyRoleTypeService,
    LoanTypeService,
    ConsumerFactoryProductService,
    MortgageFactoryProductService,
    ProductCategoryService,
    ApplicationService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
