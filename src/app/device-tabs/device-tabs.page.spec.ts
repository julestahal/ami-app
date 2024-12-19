import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceTabsPage } from './device-tabs.page';

describe('DeviceTabsPage', () => {
  let component: DeviceTabsPage;
  let fixture: ComponentFixture<DeviceTabsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
