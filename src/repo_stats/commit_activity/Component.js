import StatComponent from '../StatComponent';
import WeeklyChartBuilder from './WeeklyChartBuilder';

class CodeFrequencyComponent extends StatComponent {
  constructor() {
    super({
      ChartBuilder: WeeklyChartBuilder,
      statName: 'commit_activity'});
  }
}

export default CodeFrequencyComponent;
