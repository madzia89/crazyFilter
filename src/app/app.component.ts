import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  users = [
    {
      name: 'adam',
      absence: [
        {date: '2018-11-05', type: 'vacation'},
        {date: '2018-11-06', type: 'remote'}
      ]
    },
    {
      name: 'olek',
      absence: [
        {date: '2018-11-05', type: 'remote'}
      ]
    },
    {
      name: 'blabla',
      absence: [
        {date: '2018-11-05', type: 'vacation'}
      ]
    },
    {
      name: 'ehe',
      absence: [
        {date: '2018-11-06', type: 'vacation'}
      ]
    },
    {
      name: 'blabla',
      absence: [
        {date: '2018-11-05', type: 'remote'}
      ]
    },
    {
      name: 'huehue',
      absence: [
        {date: '2018-11-06', type: 'vacation'},
        {date: '2018-11-05', type: 'remote'}
      ]
    },
    {
      name: 'norek',
      absence: []
    },

  ];
  checkBoxData = [
    {date: moment().format('YYYY-MM-DD'), type: 'office', name: 'dzisiaj w biurze'},
    {date: moment().format('YYYY-MM-DD'), type: 'remote', name: 'dzisiaj zdalnie'},
    {date: moment().format('YYYY-MM-DD'), type: 'vacation', name: 'dzisiaj urlop'},
    {date: moment().add(1, 'days').format('YYYY-MM-DD'), type: 'vacation', name: 'jutro urlop'},
    {date: moment().add(1, 'days').format('YYYY-MM-DD'), type: 'remote', name: 'jutro zdalnie'},
    {date: moment().add(1, 'days').format('YYYY-MM-DD'), type: 'office', name: 'jutro w biurze'},
  ];


  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
    this.onChanges();
  }

  createForm(): any {
    this.form = this.fb.group({
      checkbox: [[]]
    });
  }

  onChanges() {
    this.form.get('checkbox').valueChanges.subscribe(val => {
      this.makeFilter(val, this.users);
    });
  }

  makeFilter(formValue, users) {
    const today =  moment().format('YYYY-MM-DD')
    const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD')
    users.forEach(userek => {
      if (!_.find(userek.absence, _.matches({date: today}))) {
       userek.absence.push({date: today, type: 'office'});
      } if (!_.find(userek.absence, _.matches({date: tomorrow}))) {
        userek.absence.push({date: tomorrow, type: 'office'});
      }
    });
  }
}
