import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupComponent } from './group.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChannelComponent } from '../channel/channel.component';

describe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;

  beforeEach(async(() => {

    let store = {};
    const mockSessionStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem').and.callFake(mockSessionStorage.removeItem);
    spyOn(sessionStorage, 'clear').and.callFake(mockSessionStorage.clear);

    sessionStorage.setItem('Authenticated_user', JSON.stringify({ "_id": "5d8b35431886a30fd0bdc4b1", "username": "super", "password": "test", "email": "super@test.com", "ofGroupAdminRole": true, "ofGroupAssisRole": true, "groupList": ["PostmanAPITest3", "Test"], "adminGroupList": ["PostmanAPITest3", "tester2000", "2serg", "pew", "pewpew", "Test"], "groupChannels": ["PostmanAPITest3-pew", "Test-test", "PostmanAPITest3-Testing", "Test-Blu", "Test-test", "Test-test", "Test-test", "Test-test", "Test-test"], "profilePicLocation": "img\\1569686240715.png", "picName": null }));
    sessionStorage.setItem('Channel', "Test");
    
    TestBed.configureTestingModule({
      declarations: [ 
        GroupComponent,
      ChannelComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Visibility set to zero', () => {
    const fixture = TestBed.createComponent(GroupComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    component.channel = "Test";
    expect(app.createChannel).toBe(false);
    expect(app.removeChannel).toBe(false);
    expect(app.removeUser).toBe(false);
    expect(app.createUser).toBe(false);
  });
});
