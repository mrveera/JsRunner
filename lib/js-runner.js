'use babel';

import JsRunnerView from './js-runner-view';
import { CompositeDisposable } from 'atom';

export default {

  jsRunnerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.jsRunnerView = new JsRunnerView(state.jsRunnerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.jsRunnerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'js-runner:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.jsRunnerView.destroy();
  },

  serialize() {
    return {
      jsRunnerViewState: this.jsRunnerView.serialize()
    };
  },

  toggle() {
    console.log('JsRunner was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
