Ext.define('HelloWorld.view.preferences.PreferencesController', {
	 extend: 'Ext.app.ViewController'
	,alias: 'controller.preferences-preferences'

	,cancel( btn ) {
		const me = this;

		me.getView().close();
	}

	,save( btn ) {
		const me = this;

		const values = me.getView().down('form').getForm().getFieldValues();

		// master password activated and only one of the fields "password" or "password confirmation" filled
		if (values.master_password === true &&
			(Ext.isEmpty(values.master_password1) === false && Ext.isEmpty(values.master_password2) === true ||
			Ext.isEmpty(values.master_password1) === true && Ext.isEmpty(values.master_password2) === false)) return;

		// password and confirmation don't match
		if (values.master_password === true && (values.master_password1 !== values.master_password2)) return;

		// master password activated and changed
		if (values.master_password === true &&
			Ext.isEmpty(values.master_password1) === false &&
			Ext.isEmpty(values.master_password2) === false) {

			values.master_password = HelloWorld.util.MD5.encypt(values.master_password1);
			delete values.master_password1;
			delete values.master_password2;
		}

		// prevent overwriting password when unchanged
		if (values.master_password === true) {
			delete values.master_password;
		}

		// Proxy
		if ( values.proxy && (Ext.isEmpty(values.proxyHost) || Ext.isEmpty(values.proxyPort)) ) return;

		// Display behaviour
		if ( values.window_display_behavior === 'show_taskbar' && values.window_close_behavior === 'keep_in_tray' ) {
			Ext.Msg.alert('Action required', 'You need to change the window closing behaviour because "Keep in tray" is not possible.');
			return;
		}

		// Locale
		if ( values.locale !== ipc.sendSync('getConfig').locale ) {
			localStorage.setItem('locale', values.locale);
			Ext.Msg.confirm('Action required', 'To change the language of HelloWorld, you need to reload the app. Do you want to do it now?', function(btnId) {
				if ( btnId === 'yes' ) ipc.send('relaunchApp');
			});
		}

		ipc.send('setConfig', values);
		me.getView().close();
	}
});
