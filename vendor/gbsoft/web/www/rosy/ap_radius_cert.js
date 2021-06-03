

	function commitMakeCrtReq()
	{
		var info = {};
		info.C = $('#radiusCAForm #CU').val();
		info.ST = $('#radiusCAForm #PR').val();
		info.L = $('#radiusCAForm #city').val();
		info.O = $('#radiusCAForm #company').val();
		info.OU = $('#radiusCAForm #unit').val();
		info.CN = $('#radiusCAForm #name').val();
		info.emailAddress = $('#radiusCAForm #email').val();
		info.password = $('#radiusCAForm #password').val();

		function crtReqCB(json) {
		}
		makeRequest(info, crtReqCB);
		return false;
	}

	function commitMakeCrt()
	{
		var info = {};
		info.C = $('#radiusCAForm #CU').val();
		info.ST = $('#radiusCAForm #PR').val();
		info.L = $('#radiusCAForm #city').val();
		info.O = $('#radiusCAForm #company').val();
		info.OU = $('#radiusCAForm #unit').val();
		info.CN = $('#radiusCAForm #name').val();
		info.emailAddress = $('#radiusCAForm #email').val();
		info.password = $('#radiusCAForm #password').val();
		info.CAPassword = $('#radiusCAForm #CAPassword').val();
		info.fromPathname = "/etc/freeradius2/private/server.key";
		info.toPathname = "/etc/freeradius2/certs/server.crt";

		function crtCertificateCB(json) {
		}

		certificateLocal(info, info, crtCertificateCB);
		return false;
	}

