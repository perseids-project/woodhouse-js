import React, { Component } from 'react';
import PropTypes from 'prop-types';
import localForage from 'localforage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { dictionaryType } from '../../lib/types';

import Loading from '../Loading/Loading';
import Lookup from '../Lookup/Lookup';
import Browse from '../Browse/Browse';
import Preface from '../Preface/Preface';
import Navbar from '../Navbar/Navbar';
import DummyNavbar from '../PreloadNavbar/PreloadNavbar';
import I18n from '../I18n';

const DICTIONARY_VERSION = 'woodhouse-0.0.2';

const base = '/:locale(en|fr)?';

const Router = ({ basename, dictionary }) => (
  <BrowserRouter basename={basename}>
    <>
      <Switch>
        <Route path={`${base}/(l|b)/:word?`} component={Navbar} />
        <Route path={`${base}*`} component={Navbar} />
      </Switch>
      <div className="container text-center">
        <Route
          path={base}
          render={() => (
            <header>
              <h1 className="h3 pt-4 mb-1 font-weight-normal">
                <I18n t="header.title" />
              </h1>
              <h4 className="h5 mb-2 font-weight-normal">
                <em>
                  <I18n t="header.subtitle" />
                </em>
              </h4>
              <h5 className="h5 mb-3 font-weight-normal">
                <I18n t="header.author" />
              </h5>
            </header>
          )}
        />
        <main>
          <div className="mb-4">
            <Switch>
              <Route exact path={`${base}`} render={(props) => <Lookup {...props} dictionary={dictionary} />} />
              <Route exact path={`${base}/l/:word?`} render={(props) => <Lookup {...props} dictionary={dictionary} />} />
              <Route exact path={`${base}/b/:word?`} render={(props) => <Browse {...props} dictionary={dictionary} />} />
              <Route exact path={`${base}/p/preface`} component={Preface} />
              <Route exact path={`${base}/:word?`} render={(props) => <Lookup {...props} dictionary={dictionary} />} />
            </Switch>
          </div>
        </main>
      </div>
    </>
  </BrowserRouter>
);

Router.propTypes = {
  basename: PropTypes.string.isRequired,
  dictionary: dictionaryType.isRequired,
};

const cacheDictionary = (loaded) => {
  const dictionary = loaded.default;

  localForage.setItem(DICTIONARY_VERSION, dictionary);

  return dictionary;
};

class AsyncRouter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingText: 'Loading dictionary from cache...',
      dictionary: null,
    };
  }

  componentDidMount() {
    localForage.getItem(DICTIONARY_VERSION).then((dictionary) => {
      if (dictionary) {
        this.setState({ dictionary });
      } else {
        this.setState({ loadingText: 'Downloading dictionary...' }, this.asyncImport);
      }
    });
  }

  asyncImport() {
    import('../../lib/Dictionary').then(cacheDictionary).then((dictionary) => {
      this.setState({ dictionary });
    });
  }

  render() {
    const {
      loadingText,
      dictionary,
    } = this.state;

    if (dictionary === null) {
      return (
        <>
          <DummyNavbar />
          <div className="container text-center">
            <BrowserRouter>
              <Route
                path={base}
                render={() => (
                  <header>
                    <h1 className="h3 pt-4 mb-1 font-weight-normal">
                      <I18n t="header.title" />
                    </h1>
                    <h4 className="h5 mb-2 font-weight-normal">
                      <em>
                        <I18n t="header.subtitle" />
                      </em>
                    </h4>
                    <h5 className="h5 mb-3 font-weight-normal">
                      <I18n t="header.author" />
                    </h5>
                  </header>
                )}
              />
            </BrowserRouter>
            <main>
              <Loading text={loadingText} />
            </main>
          </div>
        </>
      );
    }

    return <Router {...this.props} dictionary={dictionary} />;
  }
}

export default AsyncRouter;
