import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyUrlListComponent } from './tiny-url-list.component';

describe('TinyUrlListComponent', () => {
  let component: TinyUrlListComponent;
  let fixture: ComponentFixture<TinyUrlListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinyUrlListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinyUrlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
