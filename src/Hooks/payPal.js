//IMPORTANTE: CAMBIAR EL CLIENT_ID EN INDEX.html por el de CALU

// SIN USO!

/* const clientId = 'AfhFJpv6E6n00a5LYbOnPg8AebGmb4gP4Nn2gEzVs_LReGHwa2yDFbACw12LQcgdEF3ixj1VHbq91vPp';
const secretKey =
  'EG_FwEg6hJdh0etb8wJAFBSUPE_GBIkmFArfJ6Q4fFSNfgWzcXiYveD512pGG3twrauAbzivXsKLwiun';
const clientSecret = `${clientId}:${secretKey}`;
const auth = btoa(clientSecret);

export const getToken = async () => {
  const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  const accessToken = data.access_token;
  return accessToken;
};
export const handleCreateOrder = async (total) => {
  const token = await getToken();
  try {
    const response = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: { currency_code: 'USD', value: `${total}` },
          },
        ],
      }),
    });

    const data = await response.json();
    console.log('CREATE ORDER: ', data);
    const confirm = await handleConfirmOrder(data.id, token);
    const linkDePago = await confirm.links.filter((linkPago) => linkPago.rel === 'payer-action');
    if (confirm.status === 'PAYER_ACTION_REQUIRED') {
      console.log(confirm.status);
      window.open(linkDePago[0].href, '_blank');

      if (confirm.status !== 'PAYER_ACTION_REQUIRED') {
        console.log('CAMBIO: ', confirm.status);
      }
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const handleConfirmOrder = async (id, token) => {
  try {
    const confirmTheOrder = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${id}/confirm-payment-source`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          payment_source: {
            paypal: {
              name: { given_name: 'John', surname: 'Doe' },
              email_address: 'sb-skydj29102433@business.example.com',
            },
          },
        }),
      }
    );
    const data = await confirmTheOrder.json();
    console.log('CONFIRM ORDER: ', data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const handleAuthorize = async (id, token) => {
  try {
    const authorize = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${id}/authorize`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }
    );
    const data = await authorize.json();
    console.log('AUTHORIZE: ', data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const handleCapturePayment = async (id, token) => {
  try {
    const responsePayment = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${id}/capture`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const dataPayment = await responsePayment.json();
    console.log('CAPTURE PAYMENT ORDER: ', dataPayment);
  } catch (error) {
    console.error(error);
  }
};
 */
