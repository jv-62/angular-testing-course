import {TestBed} from '@angular/core/testing';

import {HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';
import {TagInterface} from '../types/tag.interface';
import {ApiService} from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });
  
  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  describe('getTags', () => {
    it('should return a list of tags', () => {
      let tags: TagInterface[] | undefined;
      service.getTags().subscribe(response => {
        tags = response;
      });
      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush([{id: '1', name: 'foo'}])
      expect(tags).toEqual([{id: '1', name: 'foo'}]);
    })
  });
  
  describe('createTags', () => {
    it('should create a tag', () => {
      let tag: TagInterface | undefined;
      service.createTags('foo').subscribe((response)=>{
        tag = response;
      });
      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush({id:'1', name: 'foo'});
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({name: 'foo'});
      expect(tag).toEqual({id:'1', name: 'foo'});
    })
    
    it('throws an error if request fails', () => {
      let actualError: HttpErrorResponse | undefined;
      service.createTags('foo').subscribe({
        next: ()=>{
          fail('Success should not be called');
        },
        error: (err)=>{
          actualError = err;
        }
      });
      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush('Server error', {
        status: 422,
        statusText: 'Unprocessible entity',
      });
      if(!actualError){
        throw new Error('Error needs to be defined');
      }
      
      expect(actualError.status).toEqual(422);
      expect(actualError.statusText).toEqual('Unprocessible entity');
    })
  })
});
