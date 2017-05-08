import StatComponent from '../StatComponent';
import ChartBuilder from './ChartBuilder';

class CodeFrequencyComponent extends StatComponent {
  constructor() {
    super({
      ChartBuilder: ChartBuilder,
      statName: 'code_frequency'});
  }
}

export default CodeFrequencyComponent;
