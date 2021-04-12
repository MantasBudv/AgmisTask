import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyUrlFormComponent } from './tiny-url-form.component';

describe('TinyUrlFormComponent', () => {
  let component: TinyUrlFormComponent;
  let fixture: ComponentFixture<TinyUrlFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinyUrlFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinyUrlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
