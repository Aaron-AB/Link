import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FirechatPage } from './firechat.page';

describe('FirechatPage', () => {
  let component: FirechatPage;
  let fixture: ComponentFixture<FirechatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirechatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FirechatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
