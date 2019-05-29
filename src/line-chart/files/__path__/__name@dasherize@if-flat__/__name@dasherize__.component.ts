import { Component<% if(!!viewEncapsulation) { %>, ViewEncapsulation<% }%><% if(changeDetection !== 'Default') { %>, ChangeDetectionStrategy<% }%> } from '@angular/core';

import { Chart } from 'angular-highcharts';

@Component({
  selector: '<%= selector %>',<% if(inlineTemplate) { %>
  template: `<button (click)="add()">Add Point!</button>
  <div style="height: 50%; width: 49%;" [chart]="chart"></div>`,<% } else { %>
  templateUrl: './<%= dasherize(name) %>.component.html',<% } if(inlineStyle) { %>
  styles: []<% } else { %>
  styleUrls: ['./<%= dasherize(name) %>.component.<%= styleext %>']<% } %><% if(!!viewEncapsulation) { %>,
  encapsulation: ViewEncapsulation.<%= viewEncapsulation %><% } if (changeDetection !== 'Default') { %>,
  changeDetection: ChangeDetectionStrategy.<%= changeDetection %><% } %>
})
export class <%= classify(name) %>Component {
  chart = new Chart({
    chart: {
      type:  '<%= chartType %>'
    },
    title: {
      text: 'Sample chart'
    },
    credits: {
      enabled: false
    },
    series: [
      <Highcharts.SeriesColumnOptions>  {
        name: 'chart',
        data: [1, 2, 3, 6, 9, 1]
      }
    ] 
  });

  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }
}