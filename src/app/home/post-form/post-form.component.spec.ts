import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePostFormComponent } from './post-form.component';

describe('HomePostFormComponent', () => {
  let component: HomePostFormComponent;
  let fixture: ComponentFixture<HomePostFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePostFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
