import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GroupService } from './group.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GroupService', () => {

  let groupService: GroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupService],
      imports: [
        HttpClientTestingModule
      ]
    });
    groupService = TestBed.get(GroupService);
  });

  it('should be created', () => {
    const service: GroupService = TestBed.get(GroupService);
    expect(service).toBeTruthy();
  });

  describe('createGroup', () => {
    it('should create a group', () => {
      const groupResponse = {
        _id: '1',
        groupList: ['Test'],
        adminGroupList: ['Test'],
      };
      let response;
      spyOn(groupService, 'createGroup').and.returnValue(of(groupResponse));

      let request = {
        group: 'Test',
        channel: 'Test',
        user: '1',
      };
      groupService.createGroup(request).subscribe(res => {
        response = res;
      });
      expect(response).toEqual(groupResponse);
    });
  });


});
