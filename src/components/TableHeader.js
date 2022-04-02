import React, { Component } from 'react';

export class TableHeader extends Component {
  render() {
    return (
      <div>
        <thead>
          <h2> Tabela de Gastos </h2>
        </thead>
        <tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </tbody>
      </div>
    );
  }
}

export default TableHeader;
