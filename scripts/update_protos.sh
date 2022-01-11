# RPC Servers
curl ${npm_package_config_url}/${npm_package_config_releasetag}/lnrpc/lightning.proto --create-dirs -o lnd/${npm_package_config_releasetag}/lightning.proto
curl ${npm_package_config_url}/${npm_package_config_releasetag}/lnrpc/walletunlocker.proto --create-dirs -o lnd/${npm_package_config_releasetag}/walletunlocker.proto
curl ${npm_package_config_url}/${npm_package_config_releasetag}/lnrpc/autopilotrpc/autopilot.proto --create-dirs -o lnd/${npm_package_config_releasetag}/autopilotrpc/autopilot.proto
curl ${npm_package_config_url}/${npm_package_config_releasetag}/lnrpc/chainrpc/chainnotifier.proto --create-dirs -o lnd/${npm_package_config_releasetag}/chainrpc/chainnotifier.proto
curl ${npm_package_config_url}/${npm_package_config_releasetag}/lnrpc/invoicesrpc/invoices.proto --create-dirs -o lnd/${npm_package_config_releasetag}/invoicesrpc/invoices.proto
curl ${npm_package_config_url}/${npm_package_config_releasetag}/lnrpc/routerrpc/router.proto --create-dirs -o lnd/${npm_package_config_releasetag}/routerrpc/router.proto
curl ${npm_package_config_url}/${npm_package_config_releasetag}/lnrpc/signrpc/signer.proto --create-dirs -o lnd/${npm_package_config_releasetag}/signrpc/signer.proto
curl ${npm_package_config_url}/${npm_package_config_releasetag}/lnrpc/walletrpc/walletkit.proto --create-dirs -o lnd/${npm_package_config_releasetag}/walletrpc/walletkit.proto
curl ${npm_package_config_url}/${npm_package_config_releasetag}/lnrpc/watchtowerrpc/watchtower.proto --create-dirs -o lnd/${npm_package_config_releasetag}/watchtowerrpc/watchtower.proto
curl ${npm_package_config_url}/${npm_package_config_releasetag}/lnrpc/wtclientrpc/wtclient.proto --create-dirs -o lnd/${npm_package_config_releasetag}/wtclientrpc/wtclient.proto

# Clean Invoices RPC Server
sed -i '' 's/import "google\/api\/annotations\.proto";//g' lnd/${npm_package_config_releasetag}/invoicesrpc/invoices.proto
