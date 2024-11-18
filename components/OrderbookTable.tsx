import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { OrderBookEntry } from './OrderBook';

interface OrderbookTableProps {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  spread: number;
}

export default function OrderbookTable({
  bids,
  asks,
  spread,
}: OrderbookTableProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm">
        Spread: ${spread.toFixed(2)} ({((spread / (asks[0]?.price || 1)) * 100).toFixed(
          4
        )}%)
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">Price (USD)</TableHead>
                <TableHead className="text-right">Size (BTC)</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bids.map((bid, index) => {
                const total = bids
                  .slice(0, index + 1)
                  .reduce((sum, b) => sum + b.size, 0);
                return (
                  <TableRow key={bid.price}>
                    <TableCell className="text-right font-medium text-green-600 dark:text-green-400">
                      {bid.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">{bid.size.toFixed(8)}</TableCell>
                    <TableCell className="text-right">{total.toFixed(8)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">Price (USD)</TableHead>
                <TableHead className="text-right">Size (BTC)</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {asks.map((ask, index) => {
                const total = asks
                  .slice(0, index + 1)
                  .reduce((sum, a) => sum + a.size, 0);
                return (
                  <TableRow key={ask.price}>
                    <TableCell className="text-right font-medium text-red-600 dark:text-red-400">
                      {ask.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">{ask.size.toFixed(8)}</TableCell>
                    <TableCell className="text-right">{total.toFixed(8)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}