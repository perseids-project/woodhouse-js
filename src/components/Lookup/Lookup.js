import React, { Component } from 'react';

import Parser from '../../lib/Parser';

import { dictionaryType, historyType, matchType } from '../../lib/types';

class Lookup extends Component {
  static propTypes = {
    dictionary: dictionaryType.isRequired,
    history: historyType.isRequired,
    match: matchType.isRequired,
  }

  constructor(props) {
    super(props);

    const { dictionary } = this.props;

    this.parser = new Parser(dictionary);
    this.handleChange = this.handleChange.bind(this);
    this.renderEntries = this.renderEntries.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    const { history } = this.props;
    const { match } = this.props;
    const { locale } = match.params;
    const base = locale ? `/${locale}` : '';

    history.push(`${base}/l/${value}`);
  }

  renderEntries(word) {
    const entries = this.parser.lookup(word);

    return entries.map(entry => <p className="text-left" key={entry.headword} dangerouslySetInnerHTML={{ __html: entry.definition }} />); // eslint-disable-line react/no-danger
  }

  render() {
    const { match } = this.props;
    const word = match.params.word || '';

    return (
      <div className="mt-4">
        <input className="form-control mb-4" type="text" value={word} onChange={this.handleChange} placeholder="Enter word..." aria-label="lookup" />
        {this.renderEntries(word)}
      </div>
    );
  }
}

export default Lookup;
