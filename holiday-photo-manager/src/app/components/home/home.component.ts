import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../../services/user/user.service';
import { RandomFactService } from '../../services/random-fact.service';
import RandomFact from 'src/app/shared/models/random-fact.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService,
    private randomFactService: RandomFactService) { }

  user!: User;
  name: string = '';
  quote: string = '';
  quoteBy: string = ''
  firstName: string = '';

  ngOnInit(): void {
    this.user = this.userService.getUserHash();
    this.name = this.user.name;
    this.firstName = this.name.split(' ')[0];
    this.randomFactService.getQuote().subscribe({
      next: (quote: RandomFact[]) => {
        this.quote = quote[0].quote;
        this.quoteBy = quote[0].author;
      }
    });
  }
}
