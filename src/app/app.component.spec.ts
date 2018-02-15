import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule, MatOption } from '@angular/material';
import { Store } from '@ngrx/store';

import { StoreMock } from 'app/common/ngrx/testing';
import { GoogleMapComponentMock } from './components/testing';
import { AppComponent } from './app.component';
import { Vehicle } from './entities';
import { selectors, actions } from './ngrx';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let googleMapComponent: GoogleMapComponentMock;
  let store: StoreMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
      ],
      providers: [
        {provide: Store, useClass: StoreMock},
      ],
      declarations: [
        GoogleMapComponentMock,
        AppComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    const googleMapDebugElement = fixture.debugElement.query(By.directive(GoogleMapComponentMock));
    googleMapComponent = googleMapDebugElement.injector.get(GoogleMapComponentMock) as GoogleMapComponentMock;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should set vehicles on app-google-map component', () => {
    const vehicles = [{id: '1'} as Vehicle];
    store.mockSelection(selectors.getVehicles, vehicles);
    fixture.detectChanges();
    expect(googleMapComponent.vehicles).toEqual(vehicles);
  });

  it('should trigger EnableRoutesAction when routes selection changed', () => {
    component.routesForm.setValue({enabledRoutes: ['1']});
    expect(store.dispatch).toHaveBeenCalledWith(new actions.EnableRoutesAction(['1']));
  });
});
