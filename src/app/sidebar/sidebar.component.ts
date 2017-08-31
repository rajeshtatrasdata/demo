import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  estimateDatas: [{
    est: number,
    customer: string,
    total: string,
    date: string
  }];

  constructor() {

    this.estimateDatas = [{
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    },
    {
      est: 12890,
      customer: 'Riverwood',
      total: '45,789',
      date: '01|26|17'
    }
    ];

  }

  ngOnInit() {


  }

}
