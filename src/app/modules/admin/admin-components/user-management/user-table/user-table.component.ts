import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  users: any[];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // W metodzie ngOnInit pobieramy listę użytkowników z serwisu
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Błąd podczas pobierania użytkowników', error);
      }
    );
  }

  updateUser(id: number) {
    this.router.navigate(['/editUser', id]);
  }

  deleteUser(id: number) {
    // Wyświetl okno dialogowe lub potwierdzenie usunięcia, a następnie obsłuż usuwanie
    const confirmed = window.confirm('Czy na pewno chcesz usunąć tego użytkownika?');
    if (confirmed) {
      this.userService.deleteUser(id).subscribe(
        () => {
          // Po sukcesywnym usunięciu odśwież listę użytkowników, aby odzwierciedlić zmiany
          this.refreshUserList();
        },
        (error) => {
          console.error('Błąd podczas usuwania użytkownika', error);
        }
      );
    }
  }

  refreshUserList() {
    // Ponownie pobierz listę użytkowników z serwisu po usunięciu użytkownika
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Błąd podczas odświeżania listy użytkowników', error);
      }
    );
  }
}
