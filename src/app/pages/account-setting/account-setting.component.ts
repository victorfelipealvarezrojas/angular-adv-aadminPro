import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: [
  ]
})
export class AccountSettingComponent implements OnInit {
  //private settingsService: SettingService manejo el theme
  constructor(private settingsService: SettingService) { }

  ngOnInit(): void {
    //cambio de theme
    this.settingsService.checkCurrentTheme();
  }

  changeColor(theme: string) {
     //cambio de theme
    this.settingsService.changeColor(theme);
  }


}
