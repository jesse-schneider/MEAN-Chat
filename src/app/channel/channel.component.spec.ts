import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelComponent } from './channel.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChannelComponent', () => {
  let component: ChannelComponent;
  let fixture: ComponentFixture<ChannelComponent>;

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
    TestBed.configureTestingModule({
      declarations: [ ChannelComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    
  });

  afterEach(() => {
    fixture.destroy();
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('Elements are inited', () => {
  //   const fixture = TestBed.createComponent(ChannelComponent);
  //   fixture.detectChanges();
  //   const app = fixture.debugElement.componentInstance;
  //   app.channel = "Test";
  //   expect(app.assis).toBeDefined();
  //   expect(app.admin).toBeDefined();
  //   expect(app.sadmin).toBeDefined();
  //   expect(app.ISent).toBeDefined();
  //   expect(app.userManagement).toBeDefined();
  //   expect(app.imageChat).toBeDefined();
  //   expect(app.channel).toBeDefined();
  //   expect(app.channelObj).toBeDefined();
  //   expect(app.user).toBeDefined();
  //   expect(app.group).toBeDefined();
  //   expect(app.channelList).toBeDefined();
  //   expect(app.messageContent).toBeDefined();
  //   expect(app.allUsers).toBeDefined();
  //   expect(app.messages).toBeDefined();
  //   expect(app.ioConnection).toBeDefined();
  //   expect(app.imgMessage).toBeDefined();
  //   expect(app.container).toBeDefined();
  // });
});
