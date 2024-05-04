import {TestBed} from "@angular/core/testing";
import {UserInterface} from "../types/user.interface";
import {UserService} from "./users.service";
import {UtilsService} from "./utils.service";

describe('UserService', () => {
   let userService: UserService;
   let utilsService: UtilsService;
//    const utilsServiceMock = {
//     pluck: jest.fn(),
//    }
   
    beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [UserService,
            UtilsService
            // {provide: UtilsService, useValue: utilsServiceMock},
        ]
    });
    userService = TestBed.inject(UserService);
    utilsService = TestBed.inject(UtilsService);
   });
   
   it('creates a service', () => {
    expect(userService).toBeTruthy();
   });
   
   describe('addUser', () => {
    it('should add a user', () => {
        const user: UserInterface = {
            id: "3",
            name: "foo"
        };
        userService.addUser(user);
        expect(userService.users$.getValue()).toEqual([{id: "3", name:"foo"}]);
    })
   });
   
   describe('removeUser', () => {
    it('should remove a user', () => {
        userService.users$.next([{id: "2", name: "foo"}]);
        userService.removeUser('2');
        expect(userService.users$.getValue()).toEqual([]);
    })
   });
   
   describe('getUserNames', () => {
    it('should get usernames', () => {
        jest.spyOn(utilsService, 'pluck');
        userService.users = [{id: '3', name: 'foo'}];
        userService.getUserNames();
        expect(utilsService.pluck).toHaveBeenCalledWith(userService.users, 'name');
        // utilsServiceMock.pluck.mockReturnValue(['foo']);
        // expect(userService.getUserNames()).toEqual(['foo']);
    })
   })
});