import { Pipe, PipeTransform } from '@angular/core';
import { AccountConnection, ExtensionClass } from '../services/extension.schema';

@Pipe({
  standalone: true,
  name: 'itemEnabled',
})
export class ItemStatePipe implements PipeTransform {
  transform(item: ExtensionClass): boolean {
    if (item?.accountConnections?.length && item.accountConnections.find((account: AccountConnection) => account.name === item.name)) {
      return true;
    }

    return false;
  }
}
