import React from 'react';
import ButtonGroupProduktivitas from './ButtonGroupProduktivitas';
import ButtonGroupComponent from './ButtonGroupComponent';
import ButtonGroupMember from './ButtonGroupMember';
import ButtonGroupSupplier from './ButtonGroupSupplier';

function NavButton() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px', alignItems: 'flex-start' }}>
          <h5 className="font-sans text-md font-bold tracking-tight text-gray-900 sm:text-md sm:leading-none md:mb-3 group">
            PRODUKTIVITAS
          </h5>
          <ButtonGroupProduktivitas />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', alignItems: 'flex-start' }}>
          <h5 className="font-sans text-md font-bold tracking-tight text-gray-900 sm:text-md sm:leading-none md:mb-3 group">
            PRODUK
          </h5>
          <ButtonGroupComponent />
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px', alignItems: 'flex-start' }}>
          <h5 className="font-sans text-md font-bold tracking-tight text-gray-900 sm:text-md sm:leading-none md:mb-3 group">
            MEMBER
          </h5>
          <ButtonGroupMember />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', alignItems: 'flex-start' }}>
          <h5 className="font-sans text-md font-bold tracking-tight text-gray-900 sm:text-md sm:leading-none md:mb-3 group">
            SUPPLIER
          </h5>
          <ButtonGroupSupplier />
        </div>
      </div>
    </div>
  );
}

export default NavButton;
