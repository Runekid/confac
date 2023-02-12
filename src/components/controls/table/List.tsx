import React, {useState} from 'react';
import {Table} from 'react-bootstrap';
import {ListHeader} from './ListHeader';
import {ListRow} from './ListRow';
import {ListFooter} from './ListFooter';
import {IFeature} from '../feature/feature-models';


const PageSize = 100;


type ListProps = {
  feature: IFeature<any, any>;
}

export const List = ({feature}: ListProps) => {
  const [page, setPage] = useState(0);

  const config = feature.list;
  let {data} = config;
  if (feature.list.filter) {
    const {filter} = feature.list;
    if (filter.fullTextSearch) {
      const {fullTextSearch} = filter;
      data = data.filter(model => fullTextSearch(filter.state, model));
    }
  }

  if (feature.list.sorter) {
    data = data.slice().sort(feature.list.sorter);
  }

  return (
    <Table size="sm" className={`table-${feature.key}`}>
      <ListHeader feature={feature} />
      <tbody>
        {data.slice(page * PageSize, page * PageSize + PageSize).map(model => (
          <ListRow config={config} model={model} key={model._id} />
        ))}
      </tbody>
      <Pagination current={page} total={data.length} onChange={setPage} />
      <ListFooter config={config} data={data} />
    </Table>
  );
};



type PaginationProps = {
  current: number;
  total: number;
  onChange: (page: number) => void;
}


const Pagination = (props: PaginationProps) => {
  const pageCount = Math.ceil(props.total / PageSize);
  if (pageCount === 1) {
    return null;
  }

  return (
    <tfoot>
      <tr>
        <td colSpan={9}>
          <ul className="pagination">
            {Array(pageCount).fill(1).map((_, pageIndex) => {
              const humanIndex = pageIndex + 1;
              if (pageIndex === props.current) {
                return <li key={humanIndex}>{humanIndex}</li>;
              }

              return (
                <li key={humanIndex} onClick={() => props.onChange(pageIndex)} className="clickable">
                  {humanIndex}
                </li>
              );
            })}
          </ul>
        </td>
      </tr>
    </tfoot>
  );
};
