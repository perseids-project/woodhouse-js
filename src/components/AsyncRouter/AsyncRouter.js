import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
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
    <React.Fragment>
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
              <Route exact path={`${base}`} render={props => <Lookup {...props} dictionary={dictionary} />} />
              <Route exact path={`${base}/l/:word?`} render={props => <Lookup {...props} dictionary={dictionary} />} />
              <Route exact path={`${base}/b/:word?`} render={props => <Browse {...props} dictionary={dictionary} />} />
              <Route exact path={`${base}/p/preface`} component={Preface} />
              <Route exact path={`${base}/:word?`} render={props => <Lookup {...props} dictionary={dictionary} />} />
            </Switch>
          </div>
        </main>
      </div>
    </React.Fragment>
  </BrowserRouter>
);

Router.propTypes = {
  basename: PropTypes.string.isRequired,
  dictionary: dictionaryType.isRequired,
};

const cacheDictionary = (loaded) => {
  const dictionary = loaded.default;

  localForage.clear().then(() => localForage.setItem(DICTIONARY_VERSION, dictionary));

  return dictionary;
};

const lookupDictionary = () => (
  localForage.getItem(DICTIONARY_VERSION).then(d => (
    { success: !!d, dictionary: d }
  )).catch(() => (
    { success: false }
  ))
);

const WaitForDownload = Loadable({
  loader: () => import('../../lib/Dictionary').then(cacheDictionary),
  loading: () => (
    <React.Fragment>
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
          <Loading text="Downloading dictionary..." />
        </main>
      </div>
    </React.Fragment>
  ),
  render(dictionary, props) {
    return <Router {...props} dictionary={dictionary} />;
  },
});

const AsyncRouter = Loadable({
  loader: lookupDictionary,
  loading: () => (
    <React.Fragment>
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
          <Loading text="Loading dictionary from cache..." />
        </main>
      </div>
    </React.Fragment>
  ),
  render(loaded, props) {
    if (loaded.success) {
      return <Router {...props} dictionary={loaded.dictionary} />;
    }

    return <WaitForDownload {...props} />;
  },
});

export default AsyncRouter;
